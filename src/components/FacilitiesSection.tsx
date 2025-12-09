'use client';

import styles from './FacilitiesSection.module.css';
import Image from 'next/image';
import { GraduationCap, School, Users, Utensils, ShieldCheck } from 'lucide-react';

export default function FacilitiesSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.left}>
                        <span className={styles.subtitle}>Why Choose Us?</span>
                        <h2 className={styles.title}>Complete Facilities</h2>
                        <p className={styles.introDesc}>
                            We provide an environment designed to support every child’s growth, comfort, and happiness. Our facilities ensure a safe, nurturing, and engaging learning experience.
                        </p>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <GraduationCap size={40} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Quality Teaching</h3>
                                <p className={styles.itemDesc}>Our skilled educators provide engaging lessons that build strong learning foundations.</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <School size={40} color="var(--color-blue)" />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Spacious Classrooms & Play Area</h3>
                                <p className={styles.itemDesc}>Bright classrooms and wide play areas where children can learn and explore comfortably.</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <Users size={40} color="var(--color-yellow)" />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Experienced Teachers</h3>
                                <p className={styles.itemDesc}>Caring, well-trained teachers dedicated to supporting every child’s growth.</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <Utensils size={40} color="var(--color-green)" />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Nutritious Meals</h3>
                                <p className={styles.itemDesc}>Healthy, balanced meals that fuel children’s energy and development.</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <ShieldCheck size={40} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Safe & Well-Managed Environment</h3>
                                <p className={styles.itemDesc}>A secure, clean, and well-supervised space where children can thrive.</p>
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
