/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import { create } from "react-test-renderer";
import Tree from "./index";

import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

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

afterAll(cleanup);
describe("<Tree />", () => {
  test("snapshot", () => {
    const component = create(<Tree nodes={fakeTree} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("if can uncollapse chidlren nodes", () => {
    const onSelect = jest.fn();
    const onUnselect = jest.fn();
    const { container } = render(
      <Tree nodes={fakeTree as any} onSelect={onSelect} onUnselect={onUnselect} />
    );

    (container.querySelector("#button_1-3") as any)?.click();

    screen.queryByText("Emilly sofia")?.click();

    expect(onSelect).toBeCalledTimes(1);
  });

  test("if has correct number of childs", () => {
    const wrapper = mount(<Tree nodes={fakeTree} />);

    expect(wrapper.find("li").length).toEqual(4);
  });

  test("if can unselect nodes at tree", () => {
    const onSelect = jest.fn((data) => {console.log(data)});
    const onUnselect = jest.fn();

    const wrapper = mount(
      <Tree
        nodes={fakeTree as any}
        onSelect={onSelect}
        onUnselect={onUnselect}
        selecteds={["1", "1-1", "1-2", "1-3", "1-3-1"]}
      />
    );
    wrapper.find("#checkbox_1")?.simulate("click");
    expect(onSelect).toBeCalledTimes(2);

    expect(onSelect).toBeCalledWith(expect.arrayContaining(["1", "1-1", "1-2", "1-3", "1-3-1"]));
  });
});
