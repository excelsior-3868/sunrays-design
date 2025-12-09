'use client';

import styles from './FacilitiesSection.module.css';
import Image from 'next/image';
import { Gamepad2, Rocket, BookOpen } from 'lucide-react';

export default function FacilitiesSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.left}>
                        <span className={styles.subtitle}>Why Choose Us?</span>
                        <h2 className={styles.title}>Complete Facilities</h2>
                        <p className={styles.introDesc}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </p>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <Gamepad2 size={50} color="var(--color-blue)" />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Playing Area</h3>
                                <p className={styles.itemDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <Rocket size={50} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Outbound Area</h3>
                                <p className={styles.itemDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <BookOpen size={50} color="var(--color-blue)" />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Reading Area</h3>
                                <p className={styles.itemDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.blobBack}></div>
                        <Image
                            src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Child playing"
                            width={600}
                            height={600}
                            className={styles.blobImage}
                            style={{ borderRadius: '50% 50% 50% 50% / 30% 40% 60% 70%' }} // Custom shape
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
