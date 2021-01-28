<template>
	<div class="dialog">
		<div style="height:500px">
			<el-table :data="tableData" style="width: 100%;margin-top:20px;" @row-click="openDetails" ref="multipleTable"
			 @select="selectRow" @select-all="selectAll" highlight-current-row @selection-change="handleSelectionChange">
				<el-table-column type="selection" min-width="5%" @row-click="openDetails"></el-table-column>
				<el-table-column prop="gsid" label="公司编码" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="gsmc" label="公司名称" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="ywmc" label="英文名称" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sh" label="税号" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="khyh" label="开户银行" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="frdb" label="法人代表" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="tel" label="联系电话" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="email" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="fax" label="传真" min-width="10%" show-overflow-tooltip></el-table-column>
				<el-table-column prop="yhzh" label="银行账号" min-width="10%" show-overflow-tooltip></el-table-column>
			</el-table>
		</div>
		<div class="sure">
			<section class="add_button" @click="sure">
              <i class="iconfont">&#xe601;</i>确&nbsp;认
            </section>
		</div>
	</div>
</template>

<script>
	import bus from '../../bus'
	export default {
		data() {
			return {
				jldw: '',
				piid: '',
				mc: '',
				tableData: [],
				total: 0,
				page: 1,
				pageSize: 10,
				rowData: [],
			}
		},
		created() {
			this.getmsg()
		},
		methods: {
			getmsg() {
				this.$axios.get(this.url.root + 'SP0301/ChooseCompany')
					.then(res => {
						//console.log(res)
						if (res.data.msgCode == 200) {
							this.tableData = res.data.data
						}
					})
					.catch(err => {
						//console.log(err)
					})
			},
			inquire() {
				this.getmsg()
			},
			sure() {
				//console.log(this.rowData)
				if (this.rowData.length == 0) {
					bus.$emit('null', [])
				} else {
					if (this.rowData.length !== 1) {
						this.$message.error('请选择一条数据进行确认')
					} else {
						var wlMsg = this.rowData[0]
						bus.$emit('gsMsg', wlMsg)
					}
				}
			},
			openDetails(row, selected) {
				if (this.rowData.length >= 1) {
					this.$refs.multipleTable.clearSelection()
					this.$refs.multipleTable.toggleRowSelection(row)
				} else {
					//console.log(row)
					this.$refs.multipleTable.toggleRowSelection(row)
				}
			},
			selectRow(selection, row) {
				// console.log(row.b_MaterialClassOID)
				//   console.log(selection) //复选框选中行
				this.rowData = selection
			},
			selectAll(selection) {
				// console.log(selection)
				this.rowData = selection
			},
			handleSelectionChange(val) {
				this.rowData = val
			},
		}
	}
</script>


<style scoped>
	.dialog {
		width: 40%;
		position: relative;
		/* border:1px solid red */
	}

	ul {
		display: flex;
		/* justify-content: space-between; */
		white-space: nowrap;
		line-height: 60px;
		flex-flow: row wrap;
		justify-content: space-evenly;
	}

	li {
		display: flex;
		list-style: none;
		margin-left: 10px;
		width: 30%;
		overflow: hidden;
		/* justify-content: space-between */
		/* border:1px solid red */
	}

	ul>li>p {
		width: 30%;
		text-align: left;
	}

	ul>li>.el-input {
		width: 70%;
	}
	.sure{
		position: absolute;
		height: 50px;
		line-height: 50px;
		right: 0px;
		bottom: 20px;
	}
</style>
