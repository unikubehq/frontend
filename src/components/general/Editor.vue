<template>
  <div>
    <div ref="editor" class="editor"></div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import 'monaco-editor';

import { Prop } from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { setDiagnosticsOptions } from 'monaco-yaml';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

@Component
export default class Editor extends Vue {
  @Prop() readonly schemas!: [];

  @Prop() readonly value!: string;

  @Prop() readonly language!: string;

  $refs!: {
    editor: HTMLElement
  };

  editor!: IStandaloneCodeEditor;

  errorCount = 0;

  updateErrorCount(): void {
    const markers = monaco.editor.getModelMarkers({ });
    this.errorCount = markers.length;
    this.$emit('error', this.errorCount);
  }

  mounted(): void {
    monaco.editor.defineTheme('unikube', {
      base: 'vs', // can also be vs-dark or hc-black
      inherit: true, // can also be false to completely replace the builtin rules
      rules: [
        { token: 'comment', foreground: 'ff0000', fontStyle: 'italic underline' },
        { token: 'key', foreground: 'ff0000', fontStyle: 'italic underline' },
      ],
      colors: { comment: 'ff0000' },
    });

    if (this.language === 'yaml') {
      setDiagnosticsOptions({
        enableSchemaRequest: true,
        hover: true,
        completion: true,
        validate: true,
        format: true,
        schemas: this.schemas,
      });
    }

    this.editor = monaco.editor.create(this.$refs.editor, {
      value: '',
      language: this.language,
      theme: 'unikube',
      formatOnPaste: true,
      formatOnType: true,
      contextmenu: false,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      overviewRulerLanes: 0,
      scrollbar: {
        vertical: 'hidden',
      },
      minimap: {
        enabled: false,
      },
    });

    this.editor.setValue(this.value);

    this.editor.onDidChangeModelDecorations(() => {
      this.updateErrorCount();
    });

    this.editor.onDidChangeModelContent(() => {
      this.$emit('input', this.editor.getValue());
    });
  }
}
</script>

<style lang="scss">
.editor {
  width: 400px;
  height: 500px;
}
.monaco-editor {
 .margin {
   background-color: #f2f2f2 !important;
 }
}
</style>
