import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonSlides } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  // Linking variable 'slides' to the slides in hmtl page
  @ViewChild('slides', { static: true }) slides: IonSlides;

  // Slides Options (ctrl+c ctrl+v in Ionic Docs for animations)
  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };

  // User data variables
  email: string; password: string;
  name: string; lastname: string;
  country: string; state: string;

  // List of Countries and States
  countries: any; states: any;

  // Constructor
  constructor(
    public http: HttpClient, public toastController: ToastController,
    private router: Router, private authService: AuthorizationService) { }

  // Init
  ngOnInit() {
    // locking the swipe beetween Slides
    this.slides.lockSwipes(true);
    // Getting the countries and states values
    this.searchAPI();

    this.verifySession();
  }

  verifySession() {
    this.authService.AutoLogin().then(x => {
      if (x !== 'cancel') { this.router.navigate([x]); }
    });
  }

  // Inserts a new User into the Mondo datebase
  SignUp() {

    // Creating the user object to send to MondoDB
    const user = {
      email: this.email,
      name: this.name,
      lastname: this.lastname,
      password: this.password,
      country: this.country,
      state: this.state
    };

    // Sending the user object to MondoDB via POST request
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserSignUp', user)
      .subscribe(
        (response) => {
          if (response == 200) {
            // 200 sucess action
            this.statusAlert('Success', 'Account successfully registered!');
            // Reseting the values, case the user return to this page
            this.email = '';
            this.name = '';
            this.lastname = '';
            this.password = '';
            this.country = '';
            this.state = '';
            this.router.navigate(['/login']);
            // this.Move(0);
          } else if (response == 400) {
            // 400 error action
            this.statusAlert('Error', 'This email is already registered in the system!');
          } else if (response == 500) {
            // 500 error action
            this.statusAlert('Error', 'An error occurred. Please try again!');
          }
        },
        (error) => {
          // 500 error action
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );

  }

  // Action for the 'Next' and 'Previous' buttons
  Move(i) {
    // unlocking the swipe beetween Slides
    this.slides.lockSwipes(false);
    // Swiping to the selected Slide
    this.slides.slideTo(i);
    // locking the swipe beetween Slides again
    this.slides.lockSwipes(true);
  }

  // Search Countries and States data from api
  searchAPI() {

    // Searching the Countries
    this.http.get('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/getCountries')
      .subscribe((data) => {
        this.countries = data;
      });

    // Searching the States
    this.http.get('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/getStates')
      .subscribe((data) => {
        this.states = data;
      });

  }

  // Update the State list with brazilian states, if the Country is 'Brasil'
  countrySelected() {

    // Verify if the selected country is Brazil
    // and update the States list with all the brazilian states
    if (this.country == 'Brazil') {
      this.searchAPI();
    }

    // Verify if isn't Brazil
    // and update the States list with the 'Other' option
    else {
      this.state = '';
      this.states = [{ nome: 'Other' }];
    }

  }

  // Presents an alert for status
  async statusAlert(title, mensagem) {
    const alert = await this.toastController.create({
      header: title,
      message: mensagem,
      duration: 1500
    });

    await alert.present();
  }

}
