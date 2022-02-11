import { Tree } from "./components";
import treeNodes from "./assets/data";
import { useCallback, useState } from "react";
import { storage } from "./services";
import { SELECTED_PERSONS } from "./constants";
import GlobalStyle from "./themes/globalStyles";
export default function App() {
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>(() => {
    return storage.get(SELECTED_PERSONS) || [];
  });

  const unSelectNodes = useCallback((nodeIds: string[]) => {
    console.log('no unSelect')
    setSelectedNodeIds((prev) => {
      const nodesToUnselect = prev.filter(
        (nodeId) => !nodeIds.some((n) => n === nodeId)
      );
      storage.save(SELECTED_PERSONS, nodesToUnselect);
      return nodesToUnselect;
    });
  }, []);

  const selectNodes = useCallback((nodeIds: string[]) => {
    console.log('no select');
    setSelectedNodeIds((prev) => {
      const nodesToSelect = [...nodeIds, ...prev];
      storage.save(SELECTED_PERSONS, nodesToSelect);
      return nodesToSelect;
    });
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Tree
        nodes={treeNodes}
        selecteds={selectedNodeIds}
        onSelect={selectNodes}
        onUnselect={unSelectNodes}
      />
    </div>
  );
}
