const serverUrl = "https://3tp3o1t910.execute-api.us-west-2.amazonaws.com/dev";
// "http://127.0.0.1:8080"
// "https://3tp3o1t910.execute-api.us-west-2.amazonaws.com/dev"

var onSubmit = token => {
  const form = document.getElementById("mainForm");
  const body = document.getElementsByTagName("body")[0];
  const popup = document.createElement("div");
  const message = document.createElement("p");
  popup.classList.add("popup");
  const mainColumn = document.getElementById("mainColumn");
  body.insertBefore(popup, mainColumn);
  popup.appendChild(message);

  const data = Array.from(form.elements).reduce((obj, i) => {
    const name = i.getAttribute("name");
    if (name === null) return obj;
    const {
      value
    } = i;
    obj[name] = value;
    return obj;
  }, {});

  fetch(serverUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if (json.err) {
        popup.classList.add("popup--error");
        message.textContent = `${json.err} Try again in 2 seconds.`;
      } else {
        popup.classList.add("popup--success");
        message.textContent = `${json.message} Refreshing page in 2 seconds.`;
      }

      const animation = popup.animate([
        { top: "-60px" },
        { top: 0 }
      ], 300);

      animation.onfinish = () => {
        popup.classList.add("popup--visible");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      };

    })
    .catch(err => console.log(err));
};

var onLoad = () => {
  grecaptcha.render('submit', {
    "sitekey": "6LeqPX8UAAAAACJzMIFOox9uxVOMhMGDYRZK_RoV",
    "callback": onSubmit
  });
};