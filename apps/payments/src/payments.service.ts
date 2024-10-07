import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDto } from './dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly stripe = new Stripe(this.configService.get('STRIPE_KEY'), {
    apiVersion: '2024-09-30.acacia',
  });

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    return await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
  }
}
