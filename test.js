function breadthFirst(startingNode, callback) {
  let queue = [startingNode];

  while (queue.length) {
    const node = queue.shift();
    callback(node.value);

    queue.push(...node.children);
  }
}

function depthFirstPreOrder(startingNode, callback) {
  callback(startingNode.value);

  startingNode.children.forEach((element) => {
    depthFirstPreOrder(element, callback);
  });
}

function node(value) {
  return {
    value,
    children: [],
  };
}
var a = node("a");
var b = node("b");
var c = node("c");
var d = node("d");
var e = node("e");
var f = node("f");
var g = node("g");
var h = node("h");
var i = node("i");
var j = node("j");
var k = node("k");
var l = node("l");
var m = node("m");

a.children.push(b, c, d);
b.children.push(e);
e.children.push(k, l);
c.children.push(f, g, h);
h.children.push(m);
d.children.push(i, j);
