import Services from '@/utils/http';
import type { DictData, DictType, UploadData } from './typings';

class CommonServices extends Services {
    // 上传
    async upload(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await this.instance.post<AxiosData<UploadData>>(
            '/api/upload/image',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        );
        return res.data;
    }

    // 获取配置信息
    async dict(type: DictType) {
        const res = await this.instance.get<AxiosData<DictData[]>>(
            '/api/dict',
            { params: { type } },
        );
        return res.data;
    }
}

export default new CommonServices();
