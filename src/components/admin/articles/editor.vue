<template>
  <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
</template>

<script>
  import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

  import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
  import Image from '@ckeditor/ckeditor5-image/src/image';
  import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
  import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
  import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
  import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
  import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

  import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
  import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
  import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

  import FontPlugin from '@ckeditor/ckeditor5-font/src/font';
  import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
  import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
  import UnderLinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline';

  import IndentPlugin from '@ckeditor/ckeditor5-indent/src/indent';
  import IndentBlockPlugin from '@ckeditor/ckeditor5-indent/src/indentblock';

  import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
  import HorizontalLinePlugin from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';

  import { mapActions } from 'vuex';


  export default {
    name: 'articlesEditor',
    data() {
      return {
        editor: ClassicEditor,
        editorConfig: {
          plugins: [
            HeadingPlugin,
            EssentialsPlugin,
            IndentPlugin, IndentBlockPlugin,
            FontPlugin,
            BoldPlugin, ItalicPlugin, UnderLinePlugin,
            LinkPlugin, ParagraphPlugin,
            HorizontalLinePlugin,
            SimpleUploadAdapter,
            Image, ImageUpload, ImageToolbar, ImageCaption, ImageStyle, ImageResize
          ],
          toolbar: [
            'heading', '|',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'underline', '|',
            'outdent', 'indent', '|',
            'imageUpload', '|',
            'link', '|',
            'horizontalLine', '|',
            'undo', 'redo'
          ],
          simpleUpload: {
            uploadUrl: 'http://localhost:4000/articles/image'
          },
          image: {
            toolbar: ['imageTextAlternative', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
            styles: ['full', 'alignRight', 'alignLeft']
          },
          link: {
            addTargetToExternalLinks: true
          }
        }
      }
    },
    computed: {
      editorData() {
        return this.data;
      }
    },
    props: {
      data: String
    },
    methods: {
      ...mapActions([
        'addArticle'
      ]),
    },
  }
</script>

<style>
  .ck-editor__editable {
    min-height: 350px;
  }
</style>
