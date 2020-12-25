// Any plugins you want to use has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/

export const plugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons hr imagetools insertdatetime link lists media nonbreaking noneditable pagebreak preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount']

export const customPlugins = [
  {
    content: '插入图片',
    type: 'image',
    event: (cb) => { cb() },
    ref: 'insertImage',
    icon: 'icon-tupian'
  }
]
