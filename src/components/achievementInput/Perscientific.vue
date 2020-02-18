<template>
    <div>
        <el-row>
            <el-col :span=12>
                <Personal></Personal>
            </el-col>
            <el-col :span=12>
                <group></group>
            </el-col>
        </el-row>
        
        
    </div>
</template>

<script>
import personal from "./Scientific/Perscientificpersonal"
import group from "./Scientific/Perscientificgroup"
export default {
    components:{
        Personal:personal,
        Group:group
    }
}
</script>