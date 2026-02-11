import React, { useState } from 'react';
import { Button, Space, InputNumber } from 'antd';
import Dashboard from './index';
import styles from './demo.module.scss';

const DashboardDemo: React.FC = () => {
	const [value1, setValue1] = useState(30);
	const [value2, setValue2] = useState(50);
	const [value3, setValue3] = useState(70);

	return (
		<div className={styles.container}>
			<Space direction="vertical" size="large">
				<div className={styles.controls}>
					<Space>
						<InputNumber value={value1} onChange={(val) => setValue1(val || 0)} min={0} max={100} />
						<InputNumber value={value2} onChange={(val) => setValue2(val || 0)} min={0} max={100} />
						<InputNumber value={value3} onChange={(val) => setValue3(val || 0)} min={0} max={100} />
						<Button
							onClick={() => {
								setValue1(Math.random() * 100);
								setValue2(Math.random() * 100);
								setValue3(Math.random() * 100);
							}}>
							随机值
						</Button>
					</Space>
				</div>

				<div className={styles.dashboards}>
					<Dashboard value={value1} title="CPU使用率" unit="%" min={0} max={100} />
					<Dashboard value={value2} title="内存使用率" unit="%" min={0} max={100} />
					<Dashboard value={value3} title="磁盘使用率" unit="%" min={0} max={100} />
				</div>
			</Space>
		</div>
	);
};

export default DashboardDemo;
