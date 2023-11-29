rm -rf .next
time yarn build |& tee time.yarn.$(date +%s).log

rm -rf .next
time bun run build |& tee time.bun.$(date +%s).log

