import { ApiResponse } from '@mono/utils';
import { IVNIndexSummary } from '../types/chartData.interface';
import axios from 'axios';
import { mapVNIndex } from '../utils/common';

const getValueVNIndex = async (): Promise<ApiResponse<IVNIndexSummary>> => {
  try {
    const response = await axios(
      'https://api2.simplize.vn/api/company/summary/symbol/VNINDEX',
    );

    return ApiResponse.ok<IVNIndexSummary>(
      'OK',
      mapVNIndex(response.data?.data),
    );
  } catch (err) {
    console.log({ dateTime: new Date(), err });
    return ApiResponse.internalServerError<IVNIndexSummary>();
  }
};

export default {
  getValueVNIndex,
};
