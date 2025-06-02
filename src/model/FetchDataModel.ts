// src/model/FetchDataModel.ts
export class FetchDataModel {
  id: string | number;
  name: string;
  value?: any;
  // Thêm các trường khác nếu cần

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.value = data.value;
    // Gán các trường khác nếu cần
  }
}
