import { RequestHandler } from 'express';
import VNIndexService from '../service/VNIndex.service';

const notifyVNIndex: RequestHandler = async (_, res) => {
  const Info = await VNIndexService.getValueVNIndex();
  return res.status(200).json({ Info });
};

export { notifyVNIndex };
