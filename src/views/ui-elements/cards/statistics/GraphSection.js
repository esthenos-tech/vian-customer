import React from "react";
import { ForceGraph } from "../../../Application/graphComponent/forceGraph";
import data from "../../../Application/data/data.json"
function GraphSection() {
    const nodeHoverTooltip = React.useCallback((node) => {
        return `<div>     
          <b>${node.gender}</b>
        </div>`;
      }, []);
  return (
    <section className="Main">
      <ForceGraph
        linksData={data.links}
        nodesData={data.nodes}
        nodeHoverTooltip={nodeHoverTooltip}
      />
    </section>
  );
}

export default GraphSection;
