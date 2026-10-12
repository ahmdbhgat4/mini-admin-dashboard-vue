<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="ov" id="m-edit">
        <div class="modal" role="dialog" aria-modal="true">
            <h2>{{ t('user_details') }}</h2>
            <label>
                {{ t('c_name') }}
                <input class="fld" id="en" :placeholder="t('c_name')" />
            </label>
            <label>
                {{ t('c_role') }}
                <select class="fld">
                    <option value="member">{{ t('member') }}</option>
                    <option value="admin">{{ t('admin') }}</option>
                </select>
            </label>
            <label>
                {{ t('c_status') }}
                <select class="fld">
                    <option value="active">{{ t('active') }}</option>
                    <option value="pending">{{ t('pending') }}</option>
                    <option value="disabled">{{ t('disabled') }}</option>
                </select>
            </label>
            <div class="mf">
                <button class="bs" data-close>{{ t('cancel') }}</button>
                <button class="btn in" id="saveu">{{ t('save') }}</button>
            </div>
        </div>
    </div>
</template>
