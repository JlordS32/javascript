function addImage() {
    // Get a reference to the image container
    var container = document.getElementById("image-container");
  
    // Check if there's already an image in the container
    if (container.children.length > 0) {
      // If there is, remove the existing image
      container.removeChild(container.children[0]);
    }
  
    // Create an input element of type "file" and accept only image files
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
  
    // Attach an onchange event handler to the input element
    input.onchange = function(event) {
      // Get a reference to the selected file
      var file = event.target.files[0];
  
      // Create a new FileReader object to read the selected file
      var reader = new FileReader();
  
      // Attach an onload event handler to the FileReader object
      reader.onload = function() {
        // Create a new image element
        var img = document.createElement("img");
  
        // Attach an onload event handler to the image element
        img.onload = function() {
          // Create a new canvas element
          height = 300;
          width = 300;
          var canvas = document.createElement("canvas");
  
          // Get the 2D rendering context of the canvas
          var ctx = canvas.getContext("2d");
  
          // Set the width and height of the canvas to 100, which is the desired size for the image
          canvas.width = width;
          canvas.height = height;
  
          // Draw the original image onto the canvas with the desired size of 100x100 using the drawImage method
          ctx.drawImage(img, 0, 0, width, height);
  
          // Create a new image element with the resized image as its source
          var resizedImg = document.createElement("img");
          resizedImg.src = canvas.toDataURL("image/png");
  
          // Append the resized image element to the image container
          container.appendChild(resizedImg);
        };
  
        // Set the source of the image element to the data URL of the selected file
        img.src = reader.result;
      };
  
      // Read the selected file as a data URL using the FileReader's readAsDataURL method
      reader.readAsDataURL(file);
    };
  
    // Trigger a click event on the input element, which will open the file explorer for the user to select an image
    input.click();
}

button = document.querySelector('.btnTest');

button.addEventListener('click', () => {
    alert('hello')
})
  