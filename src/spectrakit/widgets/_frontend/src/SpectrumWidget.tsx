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
    // Entry prefix: n_points, has_wavenumbers, label_byte_length
    const nPoints = buffer.getUint32(offset, true);
    offset += 4;

    const hasWavenumbers = buffer.getUint32(offset, true);
    offset += 4;

    const labelByteLen = buffer.getUint32(offset, true);
    offset += 4;

    // Label string
    const labelBytes = new Uint8Array(
      buffer.buffer,
      buffer.byteOffset + offset,
      labelByteLen,
    );
    const label = decoder.decode(labelBytes);
    offset += labelByteLen;

    // Intensities: n_points * float64
    const intensities = new Float64Array(
      buffer.buffer.slice(
        buffer.byteOffset + offset,
        buffer.byteOffset + offset + nPoints * 8,
      ),
    );
    offset += nPoints * 8;

    // Wavenumbers (optional)
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
 * Convert decoded spectra into the trace format expected by SpectraView.
 *
 * Each spectrum becomes a trace with x (wavenumbers) and y (intensities)
 * arrays. If wavenumbers are not provided, integer indices are used.
 */
function toSpectraViewData(spectra: DecodedSpectrum[]) {
  return spectra.map((spec) => ({
    name: spec.label,
    x: spec.wavenumbers
      ? Array.from(spec.wavenumbers)
      : Array.from({ length: spec.intensities.length }, (_, i) => i),
    y: Array.from(spec.intensities),
  }));
}

/**
 * Main widget component rendered inside the anywidget container.
 *
 * Reads synced traitlet values from the Python model and renders
 * a SpectraView chart. The binary spectrum data is decoded and
 * memoized to avoid re-parsing on every render.
 */
export function SpectrumWidget() {
  const [spectrumData] = useModelState<DataView>("spectrum_data");
  const [title] = useModelState<string>("title");
  const [xLabel] = useModelState<string>("x_label");
  const [yLabel] = useModelState<string>("y_label");
  const [width] = useModelState<string>("width");
  const [height] = useModelState<string>("height");
  const [xReversed] = useModelState<boolean>("x_reversed");
  const [showGrid] = useModelState<boolean>("show_grid");
  const [showLegend] = useModelState<boolean>("show_legend");
  const [theme] = useModelState<string>("theme");

  // Decode binary data, memoized on the buffer reference
  const traces = useMemo(() => {
    if (!spectrumData || spectrumData.byteLength === 0) {
      return [];
    }
    const decoded = decodeBinarySpectra(spectrumData);
    return toSpectraViewData(decoded);
  }, [spectrumData]);

  if (traces.length === 0) {
    return (
      <div
        style={{
          width,
          height,
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
    <div style={{ width, height }}>
      <SpectraView
        traces={traces}
        title={title}
        xLabel={xLabel}
        yLabel={yLabel}
        xReversed={xReversed}
        showGrid={showGrid}
        showLegend={showLegend}
        theme={theme}
      />
    </div>
  );
}
