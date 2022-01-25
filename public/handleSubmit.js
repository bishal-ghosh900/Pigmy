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
    const link = document.createElement("div");
    const i = document.createElement("i");

    link.setAttribute("id", "result");

    fetch(`/api/pigmy/`, requestOptions)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Not a valid url");
      })
      .then((data) => {
        i.classList.add("fas");
        i.classList.add("fa-copy");
        i.setAttribute("id", "copy");
        i.onclick = handleCopy;
        link.innerText = `${window.location.href}${data}`;
        link.append(i);
        const lastElem = document.querySelector("#result");
        if (lastElem) main.removeChild(lastElem);
        main.append(link);
      })
      .catch((err) => {
        link.innerText = err.message;
        const lastElem = document.querySelector("#result");
        if (lastElem) main.removeChild(lastElem);
        main.append(link);
      });
  }
}

function handleCopy() {
  const result = document.querySelector("#result");
  navigator.clipboard.writeText(result.textContent);
  const i = document.querySelector("#copy");
  i.classList.remove("fas");
  i.classList.remove("fa-copy");
  i.classList.add("fa");
  i.classList.add("fa-check");
  setTimeout(() => {
    i.classList.add("fas");
    i.classList.add("fa-copy");
  }, 2000);
}
