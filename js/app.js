'use strict';

      const colors = [
        "#EA2336",
        "#FFAC0E",
        "#C4AF00",
        "#C63968",
        "#FF6870",
        "#FFBE86⁣",
        "Red",
        "Black",
        "Purple",
        "Grey",
        "Yellow",
        "Blue"
      ];
      function getColor(arrayColor) {
        const color = Math.floor(Math.random() * (arrayColor.length - 1)) + 1;
        return arrayColor[color];
      }
      console.log(getColor(colors));
      async function getQuote() {
        const numero = Math.floor(Math.random() * (1643 - 1)) + 1;
        let dataQuote = await fetch("https://type.fit/api/quotes/")
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            return data[numero];
          });
        // console.log(dataQuote);
        return dataQuote;
      }

      async function getContent(srcUrl) {
        const quote = await getQuote();
        const template = `
          <img src="${srcUrl}" alt="texto entrada" />
          <div class="contenido">
            <h3>${quote.text}</h3>
            <p>Dev by: <span>Juan Carlos </span></p>
            <p>Author: <span>${quote.author}</span></p>
            <a href="#" class="boton" style="background-color:${getColor(
              colors
            )}"> Leer más</a>
          </div>
        `;
        return template;
      }

      function getUrlImage() {

        let url = fetch(
          "https://source.unsplash.com/collection/" +
            (Math.floor(Math.random() * (1000 - 1)) + 1)
        ).then(async (res)=>{
          if (
            res.url == "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
          ) {
            return await getUrlImage()
          }else{
            return res.url
          }
        });
        return url
      }
      // let img = getUrlImage();
      // console.log(img);
      async function render(params) {
        let article = document.createElement("article");
        article.setAttribute("class", "entrada");
        const content = document.getElementById("content");
        const html = await getContent(await getUrlImage());
        article.innerHTML = html;
        content.appendChild(article);
      }

      for (let i = 0; i < 9; i++) {
        render();
      }
      function renderForNine() {
        for (let i = 0; i < 9; i++) {
          // const element = array[i];

          render();
        }
      }
      let me = this;
      document.getElementById("btn").addEventListener("click", e => {
        renderForNine();
      });