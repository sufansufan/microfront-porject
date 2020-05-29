import Vue from 'vue'
import splitPane from 'vue-splitpane'
import jdySteps from '@frames/dashboard/components/Steps'
import jdyStep from '@frames/dashboard/components/Steps/step'

Vue.component('jdy-steps', jdySteps)
Vue.component('jdy-step', jdyStep)
Vue.component('split-pane', splitPane)
