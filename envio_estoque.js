//asin["sku","itemId","qtd"]
//Desenvovido por Wanderson Rodrigo
//Amazon Fba envio de estoque massivo (Em desenvolvimento);

//Criando um input de arquivo em csv e um botão.
var e_div = document.createElement("div");
var e_input = document.createElement("input");
var e_botao = document.createElement("button");

e_input.setAttribute("type","file");
e_input.setAttribute("id","fileinput");
e_div.setAttribute("style","position:fixed;left:1%;background-color:white;bottom:3%;");

e_botao.setAttribute("id","executar");
e_botao.setAttribute("onclick","iniciarEstoque()");
e_botao.setAttribute("style","width:130px;height:45px;margin-left:10px;");
e_botao.innerText="Enviar Estoque";

e_div.appendChild(e_input);
e_div.appendChild(e_botao);

//Adicionando input e botão na laretal esquerda da pagina principal do Onsite;
document.getElementsByTagName("body")[0].appendChild(e_div);

//Abrindo arquivo e lendo
xr=new FileReader(); 
document.getElementById('fileinput').addEventListener('change', function() {               
 xr.onload=function(){    
    console.log(xr.result); 
 } 
   
 xr.readAsText(this.files[0]); 
})
//Variaveis globais
var valid;//valor de validade
var skus;//lista de skus importados
var asin;//skus dissecados para asin,itemid,estoque,validade necessaria?

//função de envio de estoque
function iniciarEstoque(){
       
console.log(xr.result); 
skus = xr.result.replaceAll(";","").replace(/\n/g, " ").replaceAll(" ","");//limpa espaços, enter e ;
asin = skus.split("*");
console.log(asin);

//
for(i=0;i<=skus.split("*").length;i++){
    if(asin[i].split(",")[3] == "true"){
      valid=1637978399;
    }else{
      valid = null;
    }

    fetch("https://onsite.amazon.com.br/api/inbound/receive-and-store", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json;charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie":  document.cookie
      },
      "referrer": "https://onsite.amazon.com.br/receive",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"provenanceItemId\":null,\"itemId\":\""+asin[i].split(",")[1]+"\",\"purchaseOrderId\":null,\"quantity\":"+asin[i].split(",")[2]+",\"disposition\":\"GOOD\",\"containerId\":\"A200\",\"expirationEpoch\":"+valid+",\"asin\":\""+asin[i].split(",")[0]+"\"}",
      "method": "POST",
      "mode": "cors"
    });
    
    }

  }
    
//1640224799 data*
