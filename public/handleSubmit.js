function handleSubmit() {
  const urlField = document.querySelector("#url-field");
  const url = urlField.value;

  if (url.length >= 3) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    };
    const main = document.querySelector("main");
    let link = document.createElement("a");
    link.setAttribute("id", "result");
    fetch(`/api/pigmy/`, requestOptions)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Not a valid url");
      })
      .then((data) => {
        link.innerText = `${window.location.href}${data}`;
        link.href = `${window.location.href}${data}`;
        link.target = "_blank";
        const lastElem = document.querySelector("#result");
        if (lastElem) main.removeChild(lastElem);
        main.append(link);
      })
      .catch((err) => {
        link = document.createElement("div");
        link.innerText = err.message;
        link.setAttribute("id", "result");
        const lastElem = document.querySelector("#result");
        if (lastElem) main.removeChild(lastElem);
        main.append(link);
      });
  }
}
