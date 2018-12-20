export default (text = "Hello world") => {
    const element = document.createElement("div");
  console.log("Ja hi som")
    element.innerHTML = text;
  
    return element;
  };