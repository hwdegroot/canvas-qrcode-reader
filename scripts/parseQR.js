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
    let image = canvas.getContext("2d");
    let imageData = image.getImageData(0, 0, canvas.width, canvas.height);
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

        alert(result.data);
    } catch (e) { }

}

if (document.querySelector("canvas")) {
    canvas2bin(document.querySelector("canvas"));
}

