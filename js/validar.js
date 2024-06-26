// Pedro Henrique Salmaze - 13783714
//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword")
var senhaHelp = document.querySelector("#inputPasswordHelp");
var senhaMeter = document.querySelector("#passStrengthMeter");
var botao = document.querySelector("#botao")
var inputResult = document.querySelector("#inputResult");
let senhaValida = false;

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^(?=.{6,}$)[a-zA-Z ]*$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Nome inválido";
        nomeHelp.style.color="red";
    }
    else if(e.target.value.trim().length < 6){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Nome inválido";
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Ano inválido";
        anoHelp.style.color="red";
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = "Ano inválido";
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear()) -120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = "Ano inválido";
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}
);

email.addEventListener('focusout', () =>
    {
        const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)+$/;
        const emailTrimado = email.value.trim();
        console.log(email.value);

        if(emailTrimado.match(regexEmail) == null){
            emailHelp.textContent = "Formato de email inválido";
            emailHelp.style.color="red";
        }
        else{
            emailHelp.textContent="";
        }
    }
);

senha.addEventListener('focusout',() =>{
    const senhaTrimada = senha.value.trim();

    if(senhaTrimada.length < 6 || senhaTrimada.length > 20) {
        senhaHelp.textContent = "Senha inválida";
        senhaValida = false;
        senhaHelp.style.color="red";
    } else if (senhaTrimada.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) == null || senhaTrimada.match(/[0-9]+/) == null || senhaTrimada.match(/[a-zA-Z]+/) == null) {
        senhaHelp.textContent = "Senha inválida";
        senhaValida = false;
        senhaHelp.style.color="red";
    } else if (VerificarNomeeAnoNaSenha(senhaTrimada)) {
        senhaHelp.textContent = "Senha inválida";
        senhaValida = false;
        senhaHelp.style.color="red";
    } else {
        senhaHelp.style.color="green";
        senhaMeter.value = VerificarForcaDaSenha(senhaTrimada);
        senhaValida = true;
    }
})

function VerificarNomeeAnoNaSenha(senha){

    let anoVazio = false;
    let nomeVazio = false;

    if(ano.value.trim() === ""){
        anoVazio = true;
    }
    if(nome.value.trim() === ""){
        nomeVazio = true;
    }

    if (nome.value.split(' ').some(v => senha.includes(v)) && !nomeVazio){
        return true;
    }
    if (senha.includes(ano.value) && !anoVazio){
        return true;
    }


    return false;
}

function VerificarForcaDaSenha(senha){
    if(senha.length < 8) {
        senhaHelp.textContent = "Senha Fraca";
        return 10;
    } else if(senha.length > 8 && senha.length <= 12) {
        senhaHelp.textContent = "Senha Moderada";
        return 20;
    } else {
        if(senha.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g).length > 1 && senha.match(/[0-9]+/g).length > 1 && senha.match(/[A-Z]+/g).length > 1) {
            senhaHelp.textContent = "Senha Forte";
            return 30;
        } else {
            senhaHelp.textContent = "Senha Moderada";
            return 20;
        }
    }
}

botao.addEventListener('click', () =>{

    if(VerificarCadastroValido()){
        inputResult.textContent = 'Seus dados foram registrados';
    }
    else{
        inputResult.textContent = 'Seus dados não foram registrados';
    }
})

function VerificarCadastroValido(){
    if(nomeHelp.textContent === '' && anoHelp.textContent === '' &&
    emailHelp.textContent === '' && senhaValida){
        return true;
    }

    return false;
}