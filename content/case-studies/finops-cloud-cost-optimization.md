# FinOps & Cloud Cost Optimization — Cutting an EC2 Bill by 86.5% Without Losing Data

## Problem Statement

A client's business-critical file-drop web server (Saturs) was running on a single EC2 instance provisioned with a 1000GB root volume — sized years earlier for headroom that data growth never actually caught up to. Real usage was closer to 70GB. On top of the oversized disk sat roughly 950GB of accumulated EBS snapshots, a spare unused Elastic IP, and an idle `t3.nano` instance left running in `us-east-1` from an earlier, abandoned experiment.

The GST-inclusive June bill: ₹29,977/month. None of the waste was doing any useful work — it was pure sunk provisioning that nobody had gone back to right-size.

---

## What Changed

A right-sized migration, not a patch: a fresh, appropriately-sized EC2 instance (t3a.micro, 100GB gp3) plus an S3 Intelligent-Tiering archive layer so aged data offloads automatically instead of the local disk growing indefinitely again. Every piece of confirmed waste — the oversized volume, the stale snapshots, the spare IP, the idle cross-region instance — was decommissioned, not just left in place "just in case."

---

## Architecture

```
Before:
  EC2 (1000GB root volume, ~70GB actually used)
    + ~950GB of accumulated snapshots
    + 1 spare unused Elastic IP
    + 1 idle t3.nano in us-east-1 (unrelated leftover)

After:
  EC2 (t3a.micro, 100GB gp3 — right-sized to real usage)
    |
    |-- Local retention: 15 days
    |
    v
  S3 (Intelligent-Tiering: Archive Access @90d, Deep Archive @180d)
    |
    v
  404-fallback CGI script transparently serves archived files
  (end-user URLs never change, whether the file is local or archived)
```

The key technical gotcha: an EBS snapshot's minimum restorable size is fixed to the *provisioned* size of its source volume, not the data actually on it — so an AMI-based "just shrink it" approach is a dead end. The only real fix is a fresh instance plus a migration, not volume surgery.

---

## Key Implementations

**Right-Sizing Instead of Patching**

- Measured actual usage (~70GB) before choosing the replacement size (100GB gp3 — real usage plus reasonable headroom, not the original 1000GB "just in case" number)
- Built the new instance fresh and migrated data across, rather than attempting to shrink the existing volume in place

**S3 Intelligent-Tiering as a Permanent Fix, Not a One-Time Cleanup**

- Nightly cron job verifies each file is safely uploaded to S3 (byte-size match) before deleting the local copy after 15 days
- This means the local disk stays small permanently — the original 1000GB problem doesn't quietly regrow over the next few years

**Full Waste Audit, Not Just the Obvious Line Item**

- The oversized volume was the headline, but the snapshots (~950GB), the spare Elastic IP, and an unrelated idle instance in a different region were all found during the same cost audit and removed together

---

## Results

| Metric | Before (June) | After (steady state) |
|---|---|---|
| Total monthly bill (incl. GST) | ₹29,977 | ≈ ₹16,400 |
| Infrastructure-only cost | ₹14,689 | ₹1,970 net (−86.5%) |
| Root volume | 1000GB (≈70GB used) | 100GB gp3 (right-sized) |
| Accumulated snapshots | ~950GB | 0 (removed) |
| Idle/unused resources | Spare Elastic IP + idle `us-east-1` instance | Removed |
| Remaining bill composition | — | ~86% data-transfer-out (the next optimization frontier) |

Net savings: roughly ₹1.5 lakh/year on infrastructure alone, with the remaining bill now genuinely usage-driven (data transfer) rather than waste-driven.

---

## Lessons

- The instance that's costing the most money is rarely the one causing the most operational pain — this server "worked fine" the whole time it was 14x oversized. Cost waste and reliability problems are different axes; auditing only for the second one misses a lot of the first.
- A cost fix that isn't structurally permanent isn't really a fix — right-sizing the disk once and not addressing *why* it kept a 1000GB safety margin in the first place would have just meant re-inflating over the next few years. The S3 archive-and-purge cron is what makes this a lasting change, not a one-time win.
- Once the obvious waste (oversized volume) is gone, the remaining bill tells you where the *next* optimization actually is — here, data-transfer-out became ~86% of what's left, pointing directly at caching headers and a CDN layer as the next lever, not more infrastructure right-sizing.
