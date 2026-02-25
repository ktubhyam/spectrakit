/**
 * Anywidget entry point for the SpectraKit spectrum viewer.
 *
 * Uses @anywidget/react's createRender to bridge the Python traitlet
 * model to a React component tree. The model exposes binary spectrum
 * data and display configuration as synced traitlets.
 */

import { createRender } from "@anywidget/react";
import { SpectrumWidget } from "./SpectrumWidget";

const render = createRender(() => <SpectrumWidget />);

export default { render };
