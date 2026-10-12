<script setup>
import ModalDelete from '@/components/ModalDelete.vue';
import ModalEdit from '@/components/ModalEdit.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="users">
        <div class="panel">
            <h2 data-i18n="n_users">{{ t('n_users') }}</h2>
            <div class="tb">
                <input class="fld grow" :placeholder="t('search_by')" aria-label="Search users" /><select
                    class="fld"
                    style="width: auto"
                    aria-label="Role"
                >
                    <option value="">{{ t('all_roles') }}</option>
                    <option value="admin">{{ t('admin') }}</option>
                    <option value="member">{{ t('member') }}</option>
                </select>
                <button class="btn in" data-add data-i18n="add_user">{{ t('add_user') }}</button>
            </div>
            <div class="tw">
                <table>
                    <thead>
                        <tr>
                            <th data-i18n="c_name">{{ t('c_name') }}</th>
                            <th>{{ t('email') }}</th>
                            <th data-i18n="c_role">{{ t('c_role') }}</th>
                            <th data-i18n="c_status">{{ t('c_status') }}</th>
                            <th data-i18n="c_actions">{{ t('c_actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Layla Hassan</td>
                            <td>layla@company.com</td>
                            <td>{{ t('admin') }}</td>
                            <td>
                                <span class="chip">{{ t('active') }}</span>
                            </td>
                            <td>
                                <button class="bs" data-edit="Layla Hassan" data-i18n="edit">{{ t('edit') }}</button>
                                <button class="bs d" data-del="Layla Hassan" data-i18n="del">{{ t('del') }}</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Omar Khaled</td>
                            <td>omar@company.com</td>
                            <td>{{ t('member') }}</td>
                            <td>
                                <span class="chip">{{ t('active') }}</span>
                            </td>
                            <td>
                                <button class="bs" data-edit="Omar Khaled" data-i18n="edit">{{ t('edit') }}</button>
                                <button class="bs d" data-del="Omar Khaled" data-i18n="del">{{ t('del') }}</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Sara Nabil</td>
                            <td>sara@company.com</td>
                            <td>{{ t('member') }}</td>
                            <td>
                                <span class="chip w">{{ t('pending') }}</span>
                            </td>
                            <td>
                                <button class="bs" data-edit="Sara Nabil" data-i18n="edit">{{ t('edit') }}</button>
                                <button class="bs d" data-del="Sara Nabil" data-i18n="del">{{ t('del') }}</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Youssef Adel</td>
                            <td>youssef@company.com</td>
                            <td>{{ t('member') }}</td>
                            <td>
                                <span class="chip n">{{ t('disabled') }}</span>
                            </td>
                            <td>
                                <button class="bs" data-edit="Youssef Adel" data-i18n="edit">{{ t('edit') }}</button>
                                <button class="bs d" data-del="Youssef Adel" data-i18n="del">{{ t('del') }}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <ModalEdit />
    <ModalDelete />
</template>
