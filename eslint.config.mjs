import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
	// 忽略文件配置
	{
		ignores: ['node_modules/**', 'dist/**', 'build/**', 'public/**', 'coverage/**', '*.min.js']
	},

	// 基础 JavaScript 推荐配置
	js.configs.recommended,

	// 主要配置
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.browser,
				...globals.node,
				// TypeScript/React 特殊类型
				JSX: 'readonly',
				NodeJS: 'readonly',
				// Web API 类型
				BlobPart: 'readonly'
			}
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'@typescript-eslint': typescript,
			prettier
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		rules: {
			// 从原配置迁移的规则
			'max-lines-per-function': ['error', { max: 300 }],

			// TypeScript 规则
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					selector: 'variable',
					format: ['camelCase'],
					leadingUnderscore: 'allow'
				},
				{
					selector: 'function',
					format: ['camelCase']
				},
				{
					selector: 'class',
					format: ['PascalCase']
				},
				{
					selector: 'interface',
					format: ['PascalCase']
				},
				{
					selector: 'typeAlias',
					format: ['PascalCase']
				},
				{
					selector: 'enum',
					format: ['PascalCase']
				},
				{
					selector: 'enumMember',
					format: ['UPPER_CASE']
				},
				{
					selector: 'variable',
					modifiers: ['const'],
					format: ['camelCase', 'UPPER_CASE', 'PascalCase']
				},
				{
					selector: 'property',
					format: ['camelCase', 'snake_case'],
					leadingUnderscore: 'allow'
				},
				{
					selector: 'property',
					format: null,
					filter: {
						regex: '^(Authorization|Carousel|Content-Type|_AMapSecurityConfig|__html)$',
						match: true
					}
				}
			],

			// React 规则
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'off', // React 17+ 不再需要
			'react/jsx-uses-vars': 'error',
			'react/react-in-jsx-scope': 'off', // React 17+ 不再需要

			// React Hooks 规则
			'react-hooks/exhaustive-deps': 'off',
			'react-hooks/rules-of-hooks': 'error',

			// 通用规则
			'no-empty-function': 'off',
			'prettier/prettier': ['error', { endOfLine: 'auto' }],
			'no-console': ['warn', { allow: ['error', 'warn'] }],
			'no-debugger': 'warn',
			'no-unused-vars': 'off',
			'no-empty': ['error', { allowEmptyCatch: true }],
			'no-nested-ternary': 'off',
			'no-plusplus': 'off',
			'no-trailing-spaces': 'error',
			'no-var': 'warn',
			'prefer-const': 'off',
			eqeqeq: 'error',
			'no-constant-condition': 'error',
			'no-multiple-empty-lines': ['warn', { max: 2 }],
			'no-redeclare': 'error',
			'no-unneeded-ternary': 'error',
			'no-unused-expressions': 'error',
			camelcase: ['error', { properties: 'never' }],
			'callback-return': 'warn',
			complexity: ['off', 11],
			'max-depth': ['error', 3],
			'max-nested-callbacks': ['off', 2]
		}
	},
	{
		ignores: [
			'**/node_modules/**',
			'**/public',
			'**/dist',
			'**/.next',
			'**/*.cjs', // 忽略配置文件
			'**/*.config.js', // 忽略配置文件
			'**/*.config.mjs', // 忽略配置文件
			'**/*next-env.d.ts', // 忽略配置文件
			'**/*.stylelintrc.js', // 忽略配置文件
			'!src/**/*.{ts,tsx}' // 只检查 src 下的 TS/TSX 文件
		]
	}
];
