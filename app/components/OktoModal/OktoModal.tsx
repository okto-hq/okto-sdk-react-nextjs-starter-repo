/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./OktoModal.module.css";
import oktoLogo from '../images/okto-logo.png';
import { CrossIcon } from "./Icon";

export const OktoModal = () => {
  const [currentScreen, setCurrentScreen] = useState<string>("");

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setCurrentScreen("")}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.logoContainer}>
              <img src={oktoLogo.src} height={24} width={24} alt="logo" />
              <div className={styles.headerText}>Okto Wallet</div>
            </div>
            <div className={styles.iconContainer}>
              <button className={styles.closeButton}>
                <CrossIcon color="#FFFFFF" />
              </button>
            </div>
          </div>
          <h1 className={styles.modalTitle}>Hello</h1>
        </div>
      </div>
    </div>
  );
};
