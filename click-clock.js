import { LitElement, html, css, unsafeCSS } from 'lit-element';

/**
 * `click-clock`
 * ClickClock
 *
 * @customElement click-clock
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

class ClickClock extends LitElement {
  static get is() {
    return 'click-clock';
  }

  static get properties() {
    return {
      numDigits: { type: Number, attribute: 'num-digits' },
      maxValue: { type: Number, attribute: 'max-value' },
      dotSize: { type: String, attribute: 'dot-size' }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background-color: #e8635e;
        --dot-size: 16px;
      }
      .clock {
        font-size: 0;
        text-align: center;
        margin-top: 20px;
      }
      .clock .digit {
        display: inline-block;
        width: calc(var(--dot-size) * 4 + 16px);
        margin: 10px;
        transform: skewX(-2deg);
      }
      .clock .digit#digit-2 .cell {
        transition: opacity 50ms ease;
      }
      .clock .digit#digit-3 .cell, .clock .digit#digit-4 .cell, .clock .digit#digit-5 .cell, .clock .digit#digit-6 .cell, .clock .digit#digit-7 .cell, .clock .digit#digit-8 .cell, .clock .digit#digit-9 .cell, .clock .digit#digit-10 .cell, .clock .digit#digit-11 .cell {
        transition: opacity 100ms ease;
      }
      .clock .digit .cell {
        width: var(--dot-size);
        height: var(--dot-size);
        margin: 2px;
        background-color: white;
        border-radius: 2px;
        display: inline-block;
        opacity: 0.1;
      }
      .clock .digit .cell.on {
        opacity: 1;
      }
      .dot { position:relative; background:#FF0; z-index:10; width:var(--dot-size); height:var(--dot-size); max-width:16px; max-height:16px; }
    `;
  }

  constructor() {
    super();
    this.numDigits = 3;
    this.maxValue = 10 * this.numDigits - 1;
    this.dotSize = '16px';
    this.now = new Date();
    this.digit = new Array(this.numDigits);
    this.countDigit = this.numDigits + 1;

    this.display = {
      0: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      1: [
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      2: [
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1
      ],
      3: [
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1
      ],
      4: [
        1, 0, 0, 0,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      5: [
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1
      ],
      6: [
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      7: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      8: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      9: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ]
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.countDigit = this.numDigits + 1;
  }

  firstUpdated() {
    this.countDigit = this.numDigits + 1;
    this.grad = new Date(this.now.getTime() + this.maxValue * 1000);
    for (let i = 0; i <= this.numDigits; i++) {
      this.digit[i + 1] = this.shadowRoot.querySelector('#digit-' + (i + 1));
    }
    requestAnimationFrame(this.start.bind(this));
  }

  _renderDigit(container, number) {
    let matrix = this.display[number];

    let children = container.children;
    let len = matrix.length;
    for (var i = 0; i < len; i++) {
      children[i].classList.remove('on');
      if (matrix[i]) {
        children[i].classList.add('on');
      }
    }
  }

  start() {
    this.now = new Date();
    let diff = String(this.grad.getTime() - this.now.getTime());
    let len = diff.length;
    if (diff > 0) {
      for (let i = 1; i <= this.countDigit; i++) {
        this._renderDigit(this.digit[i], Number(diff.charAt(len - (i + 2))));
      }
      requestAnimationFrame(this.start.bind(this));
    } else {
      document.dispatchEvent(new CustomEvent('click-clock-end', {detail: {seconds: this.maxValue}}));
    }
  }

  get digitTemplate() {
    let dotDecPos = (this.dotSize > 16) ? -16 : -parseInt(this.dotSize);
    let cssClass = (this.countDigit === 1) ? '' : 'second';
    let comma = (this.countDigit === 1) ? html`<div class="dot" style="top:${dotDecPos}px; left:${dotDecPos}px;">O</div>` : '';
    let nDots = [ ...Array(28).keys() ];
    return html`
      <div id="digit-${this.countDigit--}" class="digit ${cssClass}">
        ${nDots.map(item => html`<div class="cell"></div>`)}
        ${comma}
      </div>
    `;
  }

  render() {
    let nDigits = [ ...Array(this.numDigits + 1).keys() ];
    return html`
      <style>
        .clock {
          --dot-size: ${this.dotSize}px;
        }
      </style>
      <section class="clock">
        ${nDigits.map(item => html`${this.digitTemplate}`)}
      </section>
      <!--<button>Start</button><button>Pause</button><button>Stop</button>-->
    `;
  }
}

window.customElements.define(ClickClock.is, ClickClock);