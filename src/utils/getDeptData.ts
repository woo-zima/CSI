export default function getDeptData(){
    let fliterDate = new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString('it-IT')
    return [
        {
            deptName:'研发部门',
            orderNum:0, 
            createTime:fliterDate,
        },
        {
            deptName:'采购部门',
            orderNum:1,
            createTime:fliterDate,
        },
        {
            deptName:'安全部门',
            orderNum:2,
            createTime:fliterDate,
        },
        {
            deptName:'技术部门',
            orderNum:3,
            createTime:fliterDate,
        }
    ]

}