import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <div class="login">
    <form [formGroup]="userForm">
      <div *ngIf="clickPhone" class="emailInput">
        <input class="emailAddressInput input" type="text" placeholder="이메일 주소" formControlName="emailAddress">
        <img class="emailimg" src="./assets/emailimg.png">
        <em class="alert" *ngIf="emailAddress.errors?.required && emailAddress.touched">이메일을 입력해주세요.</em>
        <em class="alert" *ngIf="emailAddress.errors?.pattern && emailAddress.touched">이메일 형식에 맞지 않습니다.</em>
      </div>
      <div *ngIf="!clickPhone" class="phoneInput">
        <select class="phoneSelectBox" id="hiddenCountryCodeSelect">
          <option label="콩고 (+242)" value="242CG">콩고 (+242)</option>
          <option label="콩고 민주 공화국 (+243)" value="243CD">콩고 민주 공화국 (+243)</option>
          <option label="코소보 (+383)" value="383XK">코소보 (+383)</option>
          <option label="마케도니아 (+389)" value="389MK">마케도니아 (+389)</option>
          <option label="까뽀베르데 (+238)" value="238CV">까뽀베르데 (+238)</option>
          <option label="한국 (+82)" value="82KR" selected="">한국 (+82)</option>
          <option label="헝가리 (+36)" value="36HU">헝가리 (+36)</option>
          <option label="홍콩 (+852)" value="852HK">홍콩 (+852)</option>
        </select>
        <input class="numberInput" type="text" placeholder="전화번호" formControlName="number">
        <img class="phoneimg" src="./assets/phoneimg.png">
        <em class="alert" *ngIf="number.errors?.required && number.touched">전화번호를 입력해주세요</em>
        <em class="alert" *ngIf="number.errors?.pattern && number.touched">전화번호 형식에 맞지 않습니다(숫자만 입력해주세요)</em>
      </div>
      <div class="passwordInput">
        <input class="passwordInput input" type="{{passwordType}}" placeholder="비밀번호" formControlName="password">
        <img class="passwordimg" src="./assets/lockimg.png">
      </div>
      <em class="alert" *ngIf="password.errors?.required && password.touched">비밀번호를 입력해주세요.</em>
      <em class="alert" *ngIf="password.errors?.pattern && password.touched">비밀번호 형식에 맞지 않습니다.</em>
      <div class="savepassword">
        <input class="savepasswordCheckbox" type="checkbox">
        <div class="savePasswordtxt"> 비밀번호 저장 </div>
        <div class="showPassword" (click)="showhidepassword()">{{showpsswordText}}</div> 
      </div>
      <div class="footerText">
        <button class="chageLoginPhone" (click)="showhideInput()">전화번호로 로그인</button>
         · 
        <button class="forgetPassword">비밀번호가 생각나지 않으세요?</button>
      </div>
      <button class="btnLogin">로그인</button>
    </form>
  </div>
  `,
  styles: [`
    .login{
      width:504px;
      height:288px;
      text-align: center;
    }
    .input{
      width:453px;
      height:24px;
      padding:11px;
      border-style: inset;
      border-radius: 3px;
      color: #484848;
      background-color: transparent;
      margin: 10px;
      text-indent: 0px;
      text-shadow: none;
      display: inline-block;
      text-align: start;
      cursor: text;
    }
    .emailInput, .passwordInput, .phoneInput{
      position: relative;
    }
    .emailimg {
      position: absolute;
      width: 20px;
      height: 16px;
      right: 40px;
      top: 25px;
    }
    .passwordimg {
      position: absolute;
      width: 15px;
      height: 19px;
      right: 43px;
      top: 25px;
    }
    .numberInput{
      width:320px;
      height:24px;
      padding:11px;
      border-style: inset;
      border-radius: 3px;
      color: #484848;
      background-color: transparent;
      margin: 10px;
      text-indent: 0px;
      text-shadow: none;
      display: inline-block;
      text-align: start;
      cursor: text;
      margin-left: 20px;
    }
    .phoneimg{
      position: absolute;
      width: 18px;
      height: 19px;
      right: 40px;
      top: 25px;
    }
    .savepassword{
      display: flex;
      align-items: center;
      margin-left:10px;
      margin-bottom:10px;
    }
    .savepasswordCheckbox{
      width: 18px;
      height: 18px;
    }
    .showPassword{
      margin-left: 250px;
    }
    .footerText{
      float:left;
      margin-left:8px;
      margin-bottom:10px;
    }
      
    .chageLoginPhone, .forgetPassword, .showPassword{
      border-style: none;
      background: none;
      font-weight: bold;
      color: #008489;
      font-size:14px;
      cursor: pointer;
    }
    .btnLogin{
      width: 479px;
      height: 48px;
      padding: 10px 22px;
      background: #FF5A5F;
      border: 2px solid #FF5A5F;
      border-radius: 5px;
      margin-left:5px;
      margin-bottom:10px;
      color: white;
      font-weight: bold;
      font-size:16px;
      cursor: pointer;
    }
    
    .phoneSelectBox{
      margin-left:10px;
      width:112px;
      height:46px;
    }

    .alert{
      color: red;
    }
  `]
})
export class AppComponent implements OnInit {

  userForm: FormGroup;
  passwordType: string;
  passwordFlag: boolean = true;
  showpsswordText: string = '비밀번호 보기';
  clickPhone: boolean = true;

  ngOnInit() {
    this.passwordType = 'password';

    this.userForm = new FormGroup({
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{4,10}')
      ]),
      number: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]{9,11}')
      ])

    })
  }

  showhidepassword() {
    if (!this.passwordFlag) {
      this.passwordType = 'password';
      this.passwordFlag = true;
      this.showpsswordText = '비밀번호 보기';
    } else {
      this.passwordType = 'text';
      this.passwordFlag = false;
      this.showpsswordText = '비밀번호 숨기기';
    }
  }
  showhideInput() {
    if (this.clickPhone){
      this.clickPhone = false;
    } else {
      this.clickPhone = true;
    }
  }

  get emailAddress() {
    return this.userForm.get('emailAddress');
  }

  get password() {
    return this.userForm.get('password');
  }

  get number() {
    return this.userForm.get('number');
  }
}
