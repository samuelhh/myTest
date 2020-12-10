import $http from "@/config/http";

//学校列表
export const queryListByAdmin = (data) => {
    return $http({
        url: '/sysSchool/queryListByAdmin',
        method: 'get',
        params:data
    })
}
//新增学校
export const addSchoolByAdmin = (params) => {
    return $http.post("/sysSchool/addSchoolByAdmin", params)
}