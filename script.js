// efeito da barra do menu

$(document).ready(function(){
    $(window).scroll(function(){
        if (this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
    }if(this.scrollY > 500){
      $('.scroll-up-btn').addClass("show");
    }else{
      $('.scroll-up-btn').removeClass("show");
    }
  });

   $('.scroll-up-btn').click(function(){
      $('html').animate({scrollTop:0});
   }
   )

});


//menu hamburguer

$(document).ready(function() {
    $(".menu-btn").click(function() {
    $(this).toggleClass("active");
    $(".menu").toggleClass("active");

    });
});


//configuração do formulario

class FormSubmit{
  constructor(settings) {
    this.settings = settings;
    this.form= document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form){
        this.url = this.form.getAttribute("action");

    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess(){
    this.form.innerHTML = this.settings.success;
  }

  displayError(){
    this.form.innerHTML = this.settings.error;

  }

  getFormObject(){
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]")
    fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;

    });
    return formObject;
  }

  onSubmission(event){
    event.preventDefault();
    event.targer.disabled = true;
    event.target.innerText = "Enviando...";

  }


async sendForm(event){
   try {
     this.onSubmission(event);
     await fetch(this.url, {
        method: "POST",
        headers: {
            "content-Type":"application/json",
            Accept: "application/json",
        },

        body:  JSON.stringify(this.getFormObject()),

    } );

    this.displaySuccess();
  } catch{
     this.displayError();
     throw new Error(error);

  }
 }


  init(){
    if (this.form) this.formButton.addEventListener("click", () => this.displaySuccess());
    return this;
  }

}

const formSubmit = new FormSubmit({
        form: "[data-form]",
        button: "[data-button]",
        success: "<h1 class='success'>Mensagem enviada</h1>",
        error: "<h1 class='error'> Não foi possivel enviar sua mensagem </h1>",
}); 

formSubmit.init();