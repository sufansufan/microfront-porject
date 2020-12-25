<template>
	<div class="project-contract">
		<div class="form-top">
			<el-form :rules="rules" :model="ruleform" label-width="130px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="合同编号:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="项目归属:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="归属单位:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="工程名称:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合同类型:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同金额:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合同状态:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工程地点:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="详细地址:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="建设单位:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="建设单位联系人:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="建设单位联系电话:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="设计单位:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="监理单位:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="签订日期:">
							<el-date-picker v-model="ruleform.number"  disabled="true" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="工程规模:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工程状态:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="日历工期:">
							<el-input-number v-model="ruleform.number" disabled="true" :min="1" :max="10" label="描述文字"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="开工日期:">
							<el-date-picker  disabled="true" v-model="ruleform.number" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="竣工日期:">
							<el-date-picker disabled="true" v-model="ruleform.number" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="延期竣工日期:">
							<el-date-picker v-model="ruleform.number" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否注册建筑师:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工程建造师:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="变更建造师:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="建筑用途:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="建筑结构:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="建筑面积:">
							<el-input placeholder="请输入内容" v-model="ruleform.number">
								<template slot="append">m<sup>2</sup></template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="建筑高度/层数:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否备案:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同备案号:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="归档日期:">
							<el-date-picker v-model="ruleform.number" disabled="true" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否有施工许可证:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否有中标通知书:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同:">
							合同
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="施工许可证:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="中标通知书:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="工程概况:">
							<el-input v-model="ruleform.number" type="textarea" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="工程范围:">
							<el-input v-model="ruleform.number" type="textarea" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="合同备注:">
							<el-input v-model="ruleform.number" type="textarea" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合同类型:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>

						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同金额:">
							<el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同状态:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="经办人:">
							<el-select v-model="ruleform.number" disabled="true" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="经办日期:">
							<el-date-picker v-model="ruleform.number" type="date" disabled="true" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				ruleform: {
					number: ''
				}
			}
		}
	}
</script>

<style lang="less">
	.project-contract {
		.form-top {

			.el-select,
			.el-date-editor,
			.el-input-number {
				width: 100%;
			}
		}
	}
</style>
