import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as gaxios from 'gaxios';
import { ImagePredictionResponseDto } from './image-prediction-response.dto';

@Injectable()
export class ImagePredictionService {
  private readonly logger = new Logger('ImagePrediction');
  private gaxiosInstance: gaxios.Gaxios;
  constructor(private configService: ConfigService) {
    this.gaxiosInstance = new gaxios.Gaxios();
    this.gaxiosInstance.defaults = {
      baseURL: this.configService.get('ML_SERVICE_URL'),
    };
    this.logger.log('ML Service has initialized');
  }
  async predictImage(url: string): Promise<string> {
    try {
      const response = await this.gaxiosInstance
        .request({
          url: '/',
          method: 'POST',
          data: {
            url,
          },
        })
        .then((response) => response.data as ImagePredictionResponseDto);
      return response.results[0] ?? null;
    } catch (error) {}
  }
}
