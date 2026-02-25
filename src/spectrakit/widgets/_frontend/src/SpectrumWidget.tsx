/**
 * React component that reconstructs Spectrum data from binary traitlets
 * and renders it using the SpectraView component from the spectraview
 * npm package.
 *
 * Binary format (from Python _serializers.py):
 *   [4 bytes] n_spectra (uint32 LE)
 *   For each spectrum:
 *     [4 bytes] n_points (uint32 LE)
 *     [4 bytes] has_wavenumbers (uint32 LE, 0 or 1)
 *     [4 bytes] label_byte_length (uint32 LE)
 *     [label_byte_length bytes] label (UTF-8)
 *     [n_points * 8 bytes] intensities (float64 LE)
 *     [n_points * 8 bytes] wavenumbers (float64 LE, only if has_wavenumbers)
 */

import { useModelState } from "@anywidget/react";
import { useMemo } from "react";
import { SpectraView } from "spectraview";
import type { Spectrum } from "spectraview";

/** Decoded spectrum data for a single trace. */
interface DecodedSpectrum {
  label: string;
  intensities: Float64Array;
  wavenumbers: Float64Array | null;
}

/**
 * Parse the binary buffer from Python into an array of decoded spectra.
 *
 * Returns an empty array if the buffer is empty or too small to contain
 * valid data.
 */
function decodeBinarySpectra(buffer: DataView): DecodedSpectrum[] {
  if (buffer.byteLength < 4) {
    return [];
  }

  const decoder = new TextDecoder("utf-8");
  let offset = 0;

  const nSpectra = buffer.getUint32(offset, true);
  offset += 4;

  const spectra: DecodedSpectrum[] = [];

  for (let i = 0; i < nSpectra; i++) {
    const nPoints = buffer.getUint32(offset, true);
    offset += 4;

    const hasWavenumbers = buffer.getUint32(offset, true);
    offset += 4;

    const labelByteLen = buffer.getUint32(offset, true);
    offset += 4;

    const labelBytes = new Uint8Array(
      buffer.buffer,
      buffer.byteOffset + offset,
      labelByteLen,
    );
    const label = decoder.decode(labelBytes);
    offset += labelByteLen;

    const intensities = new Float64Array(
      buffer.buffer.slice(
        buffer.byteOffset + offset,
        buffer.byteOffset + offset + nPoints * 8,
      ),
    );
    offset += nPoints * 8;

    let wavenumbers: Float64Array | null = null;
    if (hasWavenumbers) {
      wavenumbers = new Float64Array(
        buffer.buffer.slice(
          buffer.byteOffset + offset,
          buffer.byteOffset + offset + nPoints * 8,
        ),
      );
      offset += nPoints * 8;
    }

    spectra.push({ label, intensities, wavenumbers });
  }

  return spectra;
}

/**
 * Convert decoded spectra into the Spectrum[] format expected by SpectraView.
 */
function toSpectraViewSpectra(decoded: DecodedSpectrum[]): Spectrum[] {
  return decoded.map((spec, i) => {
    const n = spec.intensities.length;
    const x =
      spec.wavenumbers ??
      Float64Array.from({ length: n }, (_, j) => j);

    return {
      id: `spectrum-${i}`,
      label: spec.label || `Spectrum ${i + 1}`,
      x,
      y: spec.intensities,
      xUnit: "cm\u207B\u00B9",
      yUnit: "Absorbance",
      type: "IR" as const,
      visible: true,
    };
  });
}

/** Parse a CSS dimension string to a pixel number. */
function parseDimension(value: string, fallback: number): number {
  const num = parseInt(value, 10);
  return Number.isFinite(num) ? num : fallback;
}

/**
 * Main widget component rendered inside the anywidget container.
 *
 * Reads synced traitlet values from the Python model and renders
 * a SpectraView chart.
 */
export function SpectrumWidget() {
  const [spectrumData] = useModelState<DataView>("spectrum_data");
  const [width] = useModelState<string>("width");
  const [height] = useModelState<string>("height");
  const [xReversed] = useModelState<boolean>("x_reversed");
  const [showGrid] = useModelState<boolean>("show_grid");
  const [theme] = useModelState<string>("theme");

  const spectra = useMemo(() => {
    if (!spectrumData || spectrumData.byteLength === 0) {
      return [];
    }
    return toSpectraViewSpectra(decodeBinarySpectra(spectrumData));
  }, [spectrumData]);

  const w = parseDimension(width, 720);
  const h = parseDimension(height, 400);

  if (spectra.length === 0) {
    return (
      <div
        style={{
          width: width || "100%",
          height: height || "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #d1d5db",
          borderRadius: "8px",
          color: "#9ca3af",
          fontFamily: "system-ui, sans-serif",
          fontSize: "14px",
        }}
      >
        No spectrum data. Use{" "}
        <code style={{ margin: "0 4px" }}>viewer.set_spectrum(spec)</code> to
        add data.
      </div>
    );
  }

  return (
    <div style={{ width: width || "100%", height: height || "500px" }}>
      <SpectraView
        spectra={spectra}
        width={w}
        height={h}
        reverseX={xReversed}
        showGrid={showGrid}
        showToolbar={true}
        showCrosshair={true}
        theme={(theme === "dark" ? "dark" : "light") as "light" | "dark"}
      />
    </div>
  );
}
