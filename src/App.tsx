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

  const fakeTree = {
    "0": {
      id: "1",
      name: "Fátima Araújo",
      level: 0,
      children: {
        "0": {
          id: "1-1",
          name: "Samuel Reis",
          level: 1,
          children: {},
        },
        "1": {
          id: "1-2",
          name: "Sabrina Reis",
          level: 1,
          children: {},
        },
        "3": {
          id: "1-3",
          name: "Alexandre Lins",
          level: 1,
          children: {
            "0": {
              id: "1-3-1",
              name: "Emilly sofia",
              level: 2,
              children: {},
            },
          },
        },
      },
    },
  };
  return (
    <div className="App">
      <GlobalStyle />
      <Tree
        nodes={fakeTree}
        selecteds={selectedNodeIds}
        onSelect={selectNodes}
        onUnselect={unSelectNodes}
      />
    </div>
  );
}
