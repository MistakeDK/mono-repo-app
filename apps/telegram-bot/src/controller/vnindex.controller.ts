import { RequestHandler } from 'express';
import VNIndexService from '../service/vnindex.service';

const notifyVNIndex: RequestHandler = async (_, res) => {
  const info = await VNIndexService.getValueVNIndex();
  return res.status(200).json({ info });
};

export { notifyVNIndex };
