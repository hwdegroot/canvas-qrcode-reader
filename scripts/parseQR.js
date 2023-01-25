function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))|'+ // OR ip (v4) address
    'localhost'+ // OR localhost
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function canvas2bin(canvas) {
    let imageData = canvas?.getContext("2d")?.getImageData(0, 0, canvas.width, canvas.height);
    if (!imageData) {
        alert('nothing to do here');
        return false;
    }

    try {
        let result = window.jsQR(imageData.data, imageData.width, imageData.height);
        if (result && validURL(result.data)) {
            let specs = {
                menubar: "no",
                height: "640px",
                width: "360px"
            };
            return window.open(
                result.data,
                "remote",
                Object.keys(specs).reduce((a,c) => {
                    a += `,${c}=${specs[c]}`;
                    return a;
                },{})
            );
        }

        alert(JSON.stringify(result.data));
    } catch (e) {
        console.error(e);
        alert('Outch! Nothing to do here');
    }
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
}

function image2bin(image) {
    let imageData = getBase64Image(image);
    let result = window.jsQR(imageData.data, imageData.width, imageData.height);

    alert(result)
}

document.querySelectorAll("img").forEach(e => {
    e.addEventListener("click", e => {
        image2bin(e.target)
    });
});
//canvas2bin(document.querySelector("canvas"));

