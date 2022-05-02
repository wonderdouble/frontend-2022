import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title, 
    private meta: Meta
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url })
  }
  removeOgUrl() {
    this.meta.removeTag(`name: 'og:url'`)
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }

  /*updateOgTitle(title: string) {
    this.meta.updateTag({ property: 'og:title', content: title })
  }
  removeOgTitle() {
    this.meta.removeTag(`property: 'og:title'`);
  }*/

  updateOgDescription(desc: string) {
    this.meta.updateTag({ property: 'og:description', content: desc })
  }
  removeOgDescription() {
    this.meta.removeTag(`property: 'og:description'`);
  }

  updateOgImage(img: string) {
    this.meta.updateTag({ property: 'og:image', content: img })
  }
  removeOgImage() {
    this.meta.removeTag(`property: 'og:image'`);
  }

  updateOgImageAlt(topic: string) {
    this.meta.updateTag({ property: 'og:image:alt', content: topic })
  }
  removeOgImageAlt() {
    this.meta.removeTag(`property: 'og:image:alt'`);
  }

  updateOgUrlz(url: string) {
    this.meta.updateTag({ property: 'og:url', content: url })
  }
  removeOgUrlz() {
    this.meta.removeTag(`property: 'og:url'`);
  }

}
