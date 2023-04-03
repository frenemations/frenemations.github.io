function Undo(){
    
}
function LoadFromFile(){
    
}
function SaveToFile(){
    
}
function AddText()
{
    
}
function DrawCanvas(){
    
}
function LoadPage(url, pageNum){
  
        loadingTask = pdfjsLib.getDocument(url);
        
        loadingTask.promise.then(function(pdf){
            
        pdf.getPage(pageNum).then(function(page){
        
                 //This gives us the page's dimensions at full scale
       // var viewport = page.getViewport( {scale:1} );
        var scale = 5;
    
        //We'll create a canvas for each page to draw it on
        var canvas = document.getElementById("PDFCanvas");
        var wrapper = document.getElementById("CanvasWrapper");
        var viewport = page.getViewport({scale: scale});
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.height = "100%";
        canvas.style.width = "100%";

        
        var dimentions = getPDFLayout(viewport, document.getElementById("PageSize"));

        wrapper.style.width = dimentions.width;
        wrapper.style.height = dimentions.height;

        //Selectable Text Layer
        var textLayer = document.getElementById("textLayer");
        textLayer.style.height = viewport.height;
        textLayer.style.widows = viewport.width;
        textLayer.style.top = canvas.offsetTop;
        textLayer.style.left = canvas.offsetLeft;


    //Draw it on the canvas
    page.render({canvasContext: context, viewport: viewport}).promise.then(function(){
        context.font = "100px Arial";
        context.fillText("Hello World", 500, 1000); 
        context.fillStyle = 'rgba(0,0,0,0.8)';
        context.fillRect(200,1500,1000,1000);
        //Done Drawing, Draw Notes now
            });

    page.getTextContent().then(function(textContent){
                console.log( textContent );
                 var textLayer = new TextLayerBuilder({
                     textLayerDiv : $textLayerDiv.get(0),
                     pageIndex : page_num - 1,
                     viewport : viewport
                 });
     
                 textLayer.setTextContent(textContent);
                 textLayer.render();
             });
        }); 
    });
}

    //Calculate Layout Options For Image In PDF Page
function getPDFLayout(pdf, viewspace){

    var pageWidth = viewspace.clientWidth;
    var pageHeight = viewspace.clientHeight;

    var pdfRatio = pdf.height / pdf.width ;
    var pageRatio = pageHeight / pageWidth;

    if(pdfRatio >= pageRatio){//Vertical image, scale width
    height = "100%"; //pageHeight;
    width = ((pdf.width / pageWidth) / (pdf.height / pageHeight)) *100 + "%";
    }
    else{//Horizontal Image, scale Height
    width = "100%"//pageWidth;
    height = ((pdf.height/pageHeight) / (pdf.width / pageWidth)) * 100 + "%";
    }

    return {width: width, height: height};
}


