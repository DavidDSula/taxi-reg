import '../sass/main.scss';

document.addEventListener('DOMContentLoaded',function()
  {
    var method  = 'POST';
    var url     = "./modules/driverInsert.php";
    var asyn    = true;
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ---------------Section Admin -----------------------------------
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var loginBtn  = document.querySelector( '.formWrapper .mbtn' );
      var taxicount = 'taxicount.php';
      var location  = window.location.pathname;


      var count= 0;

      if ( loginBtn && loginBtn.offsetParent)
        {
          var logged                     = document.querySelector( 'form.logged' );
          var loginWrapper               = logged.parentNode;
              loginWrapper.style.cssText = 'position:absolute; width:auto; height:auto; left:auto; right:0; ' ;
          hideShow( loginBtn, logged );

          if( location.includes(taxicount) )
            {
                var fold               = document.querySelector('.add');
                    fold.style.cssText = 'display: block;' ;

                var formDat = new FormData();
                    formDat.append( 'getDrivers' , true );

                var getDrivers = BarPromise(method, url, asyn, formDat);

                getDrivers.then (function(data){ data && data['data'] != 0 ? formElements(data , fold) : alert("Произошла ошибка на сервере! или данных нет!"); })
                          .then (function(){showHideAfterPromise(); } )
                          .catch(function(error){alert('error !---> '+error);});
            }
        }

      function formElements( data, wrapper )
        {

            data['data'].forEach( function(e)
                {

                    var person           = crtEl ('div');
                        person.className = 'person';
                        elAdd( wrapper, person );


                    // ---Folr
                    var fold            = crtEl ('div');
                        fold.className  = 'folded';
                        person.appendChild(fold);
                        elAdd( person, fold );

                    var label           = crtEl ('label');
                        label.innerText = e['name']+" ("+ e['dateAdded'] +")";
                        elAdd( fold, label );

                    var angle_w           = crtEl ('span');
                        angle_w.setAttribute ('title', 'разверенуть/свернуть');
                        angle_w.className = 'rot';
                        elAdd( fold, angle_w );

                    var angle               = crtEl ('span');
                        angle.innerHTML     = '&#8735;';
                        angle.style.cssText = 'transform: rotate(-45deg);';
                        elAdd( angle_w, angle );

                    var add             = crtEl ('span');
                        add.setAttribute ('title', 'удалить водителя со страницы');
                        add.innerHTML   = '-';
                        elAdd( fold, add );

                    // ---Unfold
                    var unfold              = crtEl ('div');
                        unfold.className    = 'unfolded';
                        elAdd( person, unfold );

                    var form                = crtEl ('form');
                        elAdd( unfold, form );

                    var name_lbl            = crtEl ('label');
                        name_lbl.innerHTML  = 'Ф.И.О ';
                        elAdd( form, name_lbl );

                    var name_inp            = crtEl ('input');
                        name_inp.value      = e['name'];
                        name_inp.setAttribute("name", "name")
                        elAdd( form, name_inp );

                    var phone_lbl           = crtEl ('label');
                        phone_lbl.innerHTML = 'Номер телефона';
                        elAdd( form, phone_lbl );

                    var phone_inp           = crtEl ('input');
                        phone_inp.value     = e['phone'];
                        phone_inp.setAttribute("name", "phone");
                        elAdd( form, phone_inp );

                    var firm_lbl           = crtEl('label');
                        firm_lbl.innerHTML = 'Марка Автомобиля';
                        elAdd( form, firm_lbl );

                    var firm_inp           = crtEl('input');
                        firm_inp.value     = e['firm'];
                        firm_inp.setAttribute("name", "marc");
                        elAdd( form, firm_inp );

                    var model_lbl           = crtEl('label');
                        model_lbl.innerHTML = 'Марка Автомобиля';
                        elAdd( form, model_lbl );

                    var model_inp           = crtEl ('input');
                        model_inp.value     = e['model'];
                        model_inp.setAttribute("name", "model");
                        elAdd( form, model_inp );

                    var year_lbl           = crtEl ('label');
                        year_lbl.innerHTML = 'Год Выпуска';
                        elAdd( form, year_lbl );

                    var year_inp           = crtEl ('input');
                        year_inp.value     = e['year'];
                        year_inp.setAttribute("name", "year");
                        elAdd( form, year_inp );

                    var color_lbl           = crtEl ('label');
                        color_lbl.innerHTML = 'Цвет Автомобиля';
                        elAdd( form, color_lbl );

                    var color_inp           =  crtEl ('input');
                        color_inp.value     = e['color'];
                        color_inp.setAttribute("name", "color");
                        elAdd( form, color_inp );

                    var gNumber_lbl          = crtEl ('label');
                        gNumber_lbl.innerHTML= 'Гос. номер автомобиля';
                        elAdd( form, gNumber_lbl );

                    var gNumber_inp           = crtEl ('input');
                        gNumber_inp.value     = e['stateNumber'];
                        gNumber_inp.setAttribute("name", "g_n");
                        elAdd( form, gNumber_inp );

                    var license_lbl           =  crtEl ('label');
                        license_lbl.innerHTML = 'Серия и номер ВУ (прав)';
                        elAdd( form, license_lbl );

                    var license_inp        = crtEl ('input');
                        license_inp.value  = e['licrnseNum'];
                        license_inp.setAttribute("name", "licens");
                        elAdd( form, license_inp );

                    var licenseTerminate_lbl           =  crtEl ('label');
                        licenseTerminate_lbl.innerHTML = 'Дата выдачи и окончания ВУ (прав)';
                        elAdd( form, licenseTerminate_lbl );

                    var licenseTerminate_inp        = crtEl ('input');
                        licenseTerminate_inp.value  = e['licenseTermination'];
                        licenseTerminate_inp.setAttribute("name", "data_l");
                        elAdd( form, licenseTerminate_inp );

                    var city_lbl           =  crtEl ('label');
                        city_lbl.innerHTML = 'Город ';
                        elAdd( form, city_lbl );

                    var city_inp        = crtEl ('input');
                        city_inp.value  = e['city'];
                        city_inp.setAttribute("name", "sity");
                        elAdd( form, city_inp );
                })


            if ( data['count'] > 20 && count == 0 )
                {
                    var el               = crtEl ('span');
                        el.className     = 'mbtn';
                        el.innerText     = 'Показать ещё';
                        el.style.cssText = 'margin-top: 10px;'
                    wrapper.insertAdjacentElement( 'afterend', el );

                    el.addEventListener ( 'click', function ( el )
                        {
                            count += 20;

                            var formDat = new FormData();
                            formDat.append( 'getDrivers' , count );

                            var getDrivers_2 = BarPromise(method, url, asyn, formDat);

                            getDrivers_2.then (function(data){ data && data['data'] ? formElements(data , fold) : alert("Произошла ошибка на сервере! или данных нет"); })
                                        .then (function(){showHideAfterPromise(); } )
                                        .catch(function(error){alert('error !---> '+error);});
                        } );
                }
            else if( data['data'] && data['data'].length < 20 && data['count'] > 20 )
                {
                    var mBtn = document.querySelector( '.body_page > .mbtn' );

                    if ( mBtn )
                        {
                            mBtn.style.cssText = 'display: none;';
                        };
                }
        };
      // ------show form / Delete application-----
        function showHideAfterPromise()
            {

            var wrapper =  document.querySelector(".add");
            var form    =  document.querySelectorAll('.unfolded > form');

            if( form[0] )
                {


                    form.forEach( function(e)
                        {
                            var arow = e.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[0];
                            var del  = e.parentNode.parentNode.childNodes[0].childNodes[2];


                            wrapper.addEventListener('click', function( ev )
                                {
                                    if(e.offsetParent && ev.target == arow   )
                                        arow.style.cssText = "transform: rotate(-45deg);";

                                    else if (!e.offsetParent && ev.target == arow || e.offsetParent && e.outerHTML.indexOf(ev.target.outerHTML) != -1 )
                                        arow.style.cssText = "transform: rotate(-225deg);";

                                    else
                                        arow.style.cssText = "transform: rotate(-45deg);";

                                    if( ev.target == del )
                                        {
                                            var person = e.parentNode.parentNode.childNodes[0].childNodes[0].innerText;
                                            var input  = e.parentNode.parentNode.childNodes[1].childNodes[0].querySelectorAll('input');

                                            if (input)
                                                {
                                                    var formd = new FormData();
                                                    formd.append( 'rem', true )

                                                    input.forEach(function(e)
                                                        {
                                                            var n = e.name.trim();
                                                            var v = e.value.trim();

                                                            formd.append( n, v )
                                                        });
                                                }


                                            var c   = 'rgb(253, 251, 251)';//White
                                            var els = message( "Удалить Водителя ?<br><br><br>" + person,  c );
                                            var obj = els.close;

                                            hideShow_2( ev.target,  els.el, ev, obj );

                                            els.subm.addEventListener('click', function( ev )
                                                {
                                                    var promiseDel =  BarPromise( method, url, asyn, formd );

                                                    promiseDel.then ( function( data ){ data =! 0 ? window.location.reload() : alert( "Произошла ошибка на сервере!" ); })
                                                              .catch( function( error ){ alert( 'error !---> '+error );} );
                                                });

                                        }

                                });


                        });
                }
            }
      // -----Add new Data from Server
        document.addEventListener ( 'click', function ( ev )
          {

            //---Arrow Show-Hide Form-----
            var arrow = document.querySelectorAll( '.folded > .rot span ' );

            arrow.forEach( function ( arowBtn )
                {
                    if ( ev.target == arowBtn )
                        {
                            var element = arowBtn.parentNode.parentNode.parentNode.childNodes[1].childNodes[0];
                            hideShow_2( arowBtn, element, ev );
                        };
                } );
            } );

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // --------------Section Index Form and Form Buttons--------------
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      //----send form-----------
      var button     =  document.querySelector('.form_body > .sub');
      var checkBox   =  document.querySelector('.form_body .checkWrapper input');
      var form_Al    =  document.querySelectorAll('.form_body > input');
      var error      =  document.createElement('p');
      var checkError =  document.createElement('p');

      if (form_Al[0])
        {
          button.insertAdjacentElement('beforebegin', error);
          button.insertAdjacentElement('afterend', checkError);


          var formData = new FormData();
              formData.append( 'driver' , true );


          button.addEventListener('click', function()
            {
              var temp = []
              form_Al.forEach(function(e)
                {
                  var k   = e.id.trim();
                  var val = e.value.trim();
                  formData.append( k , val );

                  temp[k] = val;
                });


              var check = checkInput ( temp );

              if ( check != true )
                  {
                    errorSubmit ( error, false, 'Необходимо заполнить все поля!' );
                  }
              else if ( !checkBox.checked )
                  {
                    errorSubmit ( error, true );
                    errorSubmit ( checkError, false, 'Поставте галочку!' );
                  }
              else
                  {
                    var promise = BarPromise(method, url, asyn, formData);

                    promise.then (function(data){ data > 0 ? regSucsess()  : alert("Водитель с такими данными уже есть в системе!"); })
                           .catch(function(error){alert('error !---> '+error); });

                    errorSubmit ( error, true );
                    errorSubmit ( checkError, true );
                  }
            });



        }

      function regSucsess()
        {
            button.parentNode.parentNode.parentNode.style.cssText = 'display: none';

            var m   = '<h3>Ваша заявка на подключение принята!</h3> <br> Мы                свяжемся с вами в ближайшее время! <br> Приглашайте к               нам своих друзей';
            var c   = 'rgb(253, 251, 251)';//White
            var els = message( m, c );


            var obj = els.subm.innerHTML + els.close.innerHTML

            hideShow( els.subm,  els.el, obj );


            var form_Al=  document.querySelectorAll('.form_body > input');
            form_Al.forEach(function(e){e.value = ''}); // make  form empty

        }
      function checkInput (  arr )
          {
            for ( var kay in  arr )
                {
                    if ( arr[kay] === '' )
                        {
                            return false;
                            break;
                        };
                };
            return true
          };
      function errorSubmit ( el, sucsess = false , text = 'error')
           {

                if (!sucsess )
                    {
                        el.innerText   = text;
                        el.style.color = 'red';
                    }
                else if ( el.innerText != '' && sucsess )
                    {
                        el.innerText   = '';
                    }

           };
      //--------Sow Hide---------
      var element      = document.querySelector('div.f_list');
      var closeElement = document.querySelector('.f_list span.close a');
      var btn          = document.querySelector('.form > span.sub');

      if(element)
        hideShow( btn, element, closeElement, true );  // in Universal functions
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*--------------Section Profile--------------*/
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var userMbtn = document.querySelectorAll( '.deleteAccount > div > .user ' );

        userMbtn.forEach( function ( el )
            {
                var formWrapper = el.parentNode.childNodes[3];

                hideShow( el, formWrapper );
            } );

        var newUser      = document.querySelector( '.deleteAccount > .newUser ' );
        var addBtn       = document.querySelector( '.deleteAccount > .addAc ' );
        var closenewUser = document.querySelector( '.deleteAccount > .newUser > .close >* ' );

        hideShow( addBtn, newUser, closenewUser );

        // var loc = window.location.href.split('?')[1];
        // console.log( decodeURIComponent( loc ) );




    // --Universal functions---
      function hideShow ( btn, element, closeElement= false, inhtml = false  )
      		{


                var htmlv;
                var close_html

          	    document.addEventListener('click', display);

      			function display(e)
      				{

                        !inhtml                           ?  htmlv      = element.outerHTML :  htmlv  = element.innerHTML;
                        typeof(closeElement) === 'string' ?  close_html = closeElement      :  closeElement;


                        if(!element.clientHeight && e.target === btn )
      							{
                                    element.style.cssText = 'display : block ; ';
                                }
                        else if( e.target === closeElement)
                                {
                                  element.style = 'display : none';
                                }
                        else if (close_html && close_html.indexOf(e.target.innerHTML) != -1 )
                                {
                                    element.style = 'display : none';
                                }
                        else if( htmlv.indexOf(e.target.outerHTML) != -1 && closeElement != 'dont' )
      							{
                                      element.style = 'display : block';
      							}
      					else
      							{
                                      element.style = 'display : none';
      							}



      				}

      	   };
      function hideShow_2 ( btn, element, e,  close= false, inhtml = false )
             {
               var btn          = btn;
               var element      = element;
               var closeElement = close;

               var htmlv;
            //    console.log( btn.outerHTML.indexOf(e.target.outerHTML) );


               if(!element.offsetParent && e.target === btn  )
                   {
                       element.style.cssText = 'display : block ; ';
                   }
               else
                   {
                       element.style = 'display : none';
                   }

               document.addEventListener ( 'click', ineerEvent )


               function ineerEvent ( ev )
                   {
                       var check = ev.target === closeElement;

                       !inhtml  ?  htmlv  = element.outerHTML :  htmlv  = element.innerHTML;

                       if ( htmlv.indexOf(ev.target.innerHTML) == -1  && ev.target != btn || check )
                           {
                               element.style = 'display : none';
                               document.removeEventListener ( 'click', ineerEvent )
                           }
                   } ;
             };
      function BarPromise(meth, ul, asyn , searchValue=null )
       {
  			    return new Promise(function (resolve, reject)
  				    {
  				        var xhr    = new XMLHttpRequest();
  				        xhr.open(meth,ul,asyn);
  				        xhr.onload = function ()
  					        {
  				      			if (xhr.readyState == 4 && xhr.status == 200)
  					      			{
                                            searchValue !='' ? resolve(JSON.parse(xhr.responseText)) : resolve('');
  					        		}
  					        	else
  					        		{
  								        reject(xhr.statusText);
  								    }
  			        		}

  				        xhr.onerror= function ()
  					        {
  						      	reject(xhr.statusText);
  			    			};

                         xhr.send(searchValue);

  			    	});
       }

      function message (massage, color)
        {
          removeOld ( '.message_wrapper' )
          if (massage)
            {
              var wrapper           = document.createElement('div');
                  wrapper.className = 'message_wrapper '+guid();

              var wrapperCl           = document.createElement('span');
                  wrapperCl.className = 'button_close';
              var close               = document.createElement('span');
                  close.innerText     = '❌';

              var text              = document.createElement('span');
                  text.className    = 'text_wrapper';
                  text.innerHTML    = massage;


              var submit           = document.createElement('span');
                  submit.innerText = 'Подтвердить';
                  submit.className = 'button_submite';


              wrapper.style.display           = "block";


              wrapper   .appendChild(wrapperCl);
              wrapperCl .appendChild(close);
              wrapper   .appendChild(text);
              wrapper   .appendChild(submit);
              document.body.appendChild(wrapper);


              return {'el':wrapper, 'close':close, 'subm':submit};
            }
          function removeOld ( el )
            {
                var element = document.querySelector( el );
                if(element)
                    element.remove();
            };
        }



      function crtEl (name)
        {
          var name = document.createElement(name);
          return name;
        }
      function elAdd (parent, child)
        {
          child.className   += " " + guid();
          parent.appendChild(child);
        //   parent.insertAdjacentElement('afterend',child);
        }

      function guid()
        {
          function s4()
            {
              return Math.floor((1 + Math.random()) * 0x10000)
                         .toString(16)
                         .substring(1);
            }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


  })














