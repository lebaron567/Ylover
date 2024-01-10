function showPreview() {
    var input = document.getElementById('image-selector');
    var preview = document.getElementById('preview');

    var file = input.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
}

function showPreview2() {
    var input = document.getElementById('image-selector2');
    var preview = document.getElementById('preview2');

    var file = input.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
}

function showPreview3() {
    var input = document.getElementById('image-selector3');
    var preview = document.getElementById('preview3');

    var file = input.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
}

function showPreview4() {
    var input = document.getElementById('image-selector4');
    var preview = document.getElementById('preview4');

    var file = input.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
}

function showPreview5() {
    var input = document.getElementById('image-selector5');
    var preview = document.getElementById('preview5');

    var file = input.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
}