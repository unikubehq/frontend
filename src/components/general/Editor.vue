<template>
  <div>
    <div ref="editor" class="editor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import 'monaco-editor';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { SchemasSettings, setDiagnosticsOptions } from 'monaco-yaml';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

export default defineComponent({
  name: 'UnikubeEditor',
  props: {
    schemas: {
      type: Object as PropType<SchemasSettings[]>,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  // $refs!: {
  //   editor: HTMLElement
  // }
  data() {
    return {
      editor: {} as IStandaloneCodeEditor,
      errorCount: 0,
    };
  },
  methods: {
    updateErrorCount(): void {
      const markers = monaco.editor.getModelMarkers({});
      this.errorCount = markers.length;
      this.$emit('error', this.errorCount);
    },
  },
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

    setDiagnosticsOptions({
      enableSchemaRequest: true,
      hover: true,
      completion: true,
      validate: true,
      format: true,
      schemas: this.schemas,
    });

    this.editor = monaco.editor.create(this.$refs.editor as HTMLElement, {
      value: '',
      language: 'yaml',
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
  },
});
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
