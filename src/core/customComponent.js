import Vue from 'vue'
import splitPane from 'vue-splitpane'
import JdySteps from '@framesDash/components/Steps'
import JdyStep from '@framesDash/components/Steps/step'
import AmountInput from '@framesDash/components/AmountInput'
import SearchBar from '@framesDash/components/SearchBar'
import CommTable from '@framesDash/components/CommTable'
import DragDialog from '@framesDash/components/Dialog'
import CrumbBox from '@framesDash/components/CrumbBox'
import JdyUpload from '@framesDash/components/Upload'
import JdySelect from '@framesDash/components/Select'
import JdyInt from '@framesDash/components/Int'
import JdyTitleName from '@framesDash/components/TitleName'

Vue.component('jdy-steps', JdySteps)
Vue.component('jdy-step', JdyStep)
Vue.component('split-pane', splitPane)
Vue.component('amount-input', AmountInput)
Vue.component('search-bar', SearchBar)
Vue.component('comm-table', CommTable)
Vue.component('drag-dialog', DragDialog)
Vue.component('crumb-box', CrumbBox)
Vue.component('jdy-upload', JdyUpload)
Vue.component('jdy-select', JdySelect)
Vue.component('jdy-int', JdyInt)
Vue.component('jdy-title-name', JdyTitleName)
