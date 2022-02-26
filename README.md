# kioq

## 開発の流れ

CIでチェックする項目 (https://github.com/uta8a/kioq/tree/main/.github/workflows)

- pull_request
  - commitlint: [commitlint](https://github.com/conventional-changelog/commitlint) を用いてコミットメッセージを統一する。
  - formatter: prettierを用いてソースコードのフォーマットを行う
  - linter: eslintを用いてシングルクオートに統一、みたいなコードの書き方を統一する
  - test: jestによるテスト [https://github.com/uta8a/kioq/tree/main/__tests__](https://github.com/uta8a/kioq/tree/main/__tests__) の中のテストが走る
- commit
  - formatter: pull_requestと同じ
  - linter: pull_requestと同じ
  - test: pull_requestと同じ

開発の流れ

- ブランチを切る `git branch sub-branch` `git switch sub-branch`
- なんか機能追加する
- テストを書きたくなったら `__tests__` 以下に書く
- `yarn fmt` `yarn lint` で自動fixする
- コミットメッセージはcommitlintに従う(`echo 'commit message' | yarn commitlint` で事前確認できる。git hooksに入れても良い)
- `git push origin sub-branch`

入れておくといいもの(VSCode拡張)

- editorconfigを入れていると勝手にファイル末尾の改行を追加してくれたりする
- eslint, prettierは入れておいていいかも。
