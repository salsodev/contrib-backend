import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

enum ContributionStatus {
  NOT_PAID = "not paid",
  PENDING = "pending",
  COMPLETE = "complete",
}

@Entity()
export class Contribution {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "decimal", precision: 15, scale: 2 })
  amount!: number;

  @Column({ type: "decimal", precision: 15, scale: 2 })
  expectedAmount!: number;

  @Column({
    type: "enum",
    enum: ContributionStatus,
    default: ContributionStatus.NOT_PAID,
  })
  status!: ContributionStatus;

  @Column({ default: 0 })
  updateCount!: number;

  @ManyToOne(() => User, (user) => user.contributions)
  user!: User;

  @Column({ nullable: true })
  notes!: string;

  @CreateDateColumn()
  contributionDate!: Date;

  @UpdateDateColumn()
  lastUpdate!: Date;

  @BeforeUpdate()
  incrementUpdateCount() {
    this.updateCount = this.updateCount + 1;
  }
}

/**
 * Amount
ContributionDate
Frequency (e.g., weekly, monthly, daily)
Status (e.g., paid, pending, cancelled)
PaymentReferenceNumber
LastUpdateDate
Notes
 */
